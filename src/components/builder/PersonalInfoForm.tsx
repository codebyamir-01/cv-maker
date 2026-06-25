"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Trash2, Plus, Link as LinkIcon, Globe } from "lucide-react";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").optional().or(z.literal("")),
  lastName: z.string().optional(),
  jobTitle: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  linkedIn: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const [showLinks, setShowLinks] = useState(
    !!(resumeData.personalInfo.linkedIn || resumeData.personalInfo.github || resumeData.personalInfo.portfolio)
  );

  // Backward compatibility: split fullName and location if firstName/city are empty
  let defaultFirstName = resumeData.personalInfo.firstName || "";
  let defaultLastName = resumeData.personalInfo.lastName || "";
  if (!defaultFirstName && !defaultLastName && resumeData.personalInfo.fullName) {
    const parts = resumeData.personalInfo.fullName.split(" ");
    defaultFirstName = parts[0];
    defaultLastName = parts.slice(1).join(" ");
  }

  let defaultCity = resumeData.personalInfo.city || "";
  let defaultCountry = resumeData.personalInfo.country || "";
  if (!defaultCity && !defaultCountry && resumeData.personalInfo.location) {
    const parts = resumeData.personalInfo.location.split(",");
    defaultCity = parts[0].trim();
    if (parts.length > 1) defaultCountry = parts.slice(1).join(",").trim();
  }
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
      jobTitle: resumeData.personalInfo.jobTitle || "",
      email: resumeData.personalInfo.email || "",
      phone: resumeData.personalInfo.phone || "",
      city: defaultCity,
      country: defaultCountry,
      linkedIn: resumeData.personalInfo.linkedIn || "",
      github: resumeData.personalInfo.github || "",
      portfolio: resumeData.personalInfo.portfolio || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const cleanData: any = { ...value };
      
      // Auto-generate fullName and location for templates
      if (cleanData.firstName || cleanData.lastName) {
        cleanData.fullName = `${cleanData.firstName || ""} ${cleanData.lastName || ""}`.trim();
      } else {
        cleanData.fullName = "";
      }

      if (cleanData.city || cleanData.country) {
        cleanData.location = [cleanData.city, cleanData.country].filter(Boolean).join(", ");
      } else {
        cleanData.location = "";
      }

      // EXTREMELY IMPORTANT: Do not overwrite photo or showPhoto.
      // watch() only returns form fields. We must not send photo: undefined
      // to the store, because the store merge will wipe out the photo.
      delete cleanData.photo;
      delete cleanData.showPhoto;

      updatePersonalInfo(cleanData);
    });
    return () => subscription.unsubscribe();
  }, [watch, updatePersonalInfo]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoError(null);
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setPhotoError("Image size must be less than 3MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setPhotoError("Only JPG, PNG, and WEBP formats are supported");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result as string });
        // Reset the file input so the user can upload the same image again if needed
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePersonalInfo({ photo: "" });
    setPhotoError(null);
    // Also reset file input to allow re-upload
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleShowPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePersonalInfo({ showPhoto: !resumeData.personalInfo.showPhoto });
  };

  return (
    <div className="space-y-6">
      
      {/* Contact Information Card */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-200/80 p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Contact Information</h2>
          <p className="text-slate-500 text-sm mt-1">Let's start with your basic contact details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[13px] font-semibold text-slate-700">First Name <span className="text-red-500">*</span></Label>
            <Input id="firstName" {...register("firstName")} placeholder="Amir" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-[13px] font-semibold text-slate-700">Last Name <span className="text-red-500">*</span></Label>
            <Input id="lastName" {...register("lastName")} placeholder="Khan" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="jobTitle" className="text-[13px] font-semibold text-slate-700">Professional Title <span className="font-normal text-slate-400">(appears under your name)</span></Label>
            <Input id="jobTitle" {...register("jobTitle")} placeholder="e.g., Senior Software Engineer, Full Stack Developer, Product Designer" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">This helps recruiters quickly understand your role (e.g., "Senior Frontend Developer | React Specialist")</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[13px] font-semibold text-slate-700">Email <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" {...register("email")} placeholder="traderquotex418@gmail.com" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[13px] font-semibold text-slate-700">Phone <span className="text-red-500">*</span></Label>
            <Input id="phone" {...register("phone")} placeholder="+92 3321310222" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-[13px] font-semibold text-slate-700">City <span className="text-red-500">*</span></Label>
            <Input id="city" {...register("city")} placeholder="Rawalpindi" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-[13px] font-semibold text-slate-700">Country <span className="text-red-500">*</span></Label>
            <Input id="country" {...register("country")} placeholder="Pakistan" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* Profile Photo Card */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-200/80 p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <Camera className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-slate-900">Profile Photo (Optional)</h2>
            <p className="text-slate-500 text-[13px] mt-0.5">Add a professional headshot for two-column templates (Modern Two-Column, Tech Leader, Infographic Modern)</p>
          </div>
        </div>

        <div 
          className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer relative overflow-hidden"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/jpg, image/webp" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />
          
          {resumeData.personalInfo.photo ? (
            <div className="flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resumeData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold h-9 px-4 rounded-lg">
                  Change Photo
                </Button>
                <Button variant="destructive" size="sm" onClick={removePhoto} className="h-9 w-9 p-0 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Click to upload or drag and drop</h3>
              <p className="text-[11px] text-slate-500 mb-4">JPG, PNG or WEBP (Max 3MB)</p>
              <Button variant="secondary" size="sm" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold h-9 px-4 rounded-lg pointer-events-none">
                <Upload className="w-3.5 h-3.5 mr-2" /> Select Photo
              </Button>
            </>
          )}
        </div>
        {photoError && <p className="text-red-500 text-xs mt-2 font-medium">{photoError}</p>}

        {resumeData.personalInfo.photo && (
          <div className="mt-4 flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="text-sm font-bold text-slate-900">Show photo on resume</p>
              <p className="text-xs text-slate-500 mt-0.5">Toggle to hide or show your photo in the template</p>
            </div>
            <button
              onClick={toggleShowPhoto}
              className={`w-11 h-6 rounded-full transition-colors relative ${resumeData.personalInfo.showPhoto !== false ? "bg-blue-600" : "bg-slate-300"}`}
            >
              <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${resumeData.personalInfo.showPhoto !== false ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        )}

        {/* Note for ATS templates */}
        {["ats-classic", "monochrome", "executive"].includes(resumeData.templateId) && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs font-semibold flex items-start gap-2">
            <span className="text-lg leading-none">⚠️</span>
            <span className="mt-0.5">Note: This template does not display profile photos.</span>
          </div>
        )}

        {/* Photo Tips Box */}
        <div className="mt-6 bg-[#f8fafc] border border-slate-200/60 rounded-xl p-5">
          <h4 className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-3">
            <span className="text-amber-500">💡</span> Photo Tips:
          </h4>
          <ul className="space-y-2 text-[12px] text-slate-600">
            <li className="flex gap-2"><span className="text-slate-400">•</span> Use a professional headshot with plain background</li>
            <li className="flex gap-2"><span className="text-slate-400">•</span> Dress professionally and maintain good posture</li>
            <li className="flex gap-2"><span className="text-slate-400">•</span> Ensure good lighting and clear facial features</li>
            <li className="flex gap-2"><span className="text-slate-400">•</span> Smile naturally and look directly at camera</li>
            <li className="flex gap-2"><span className="text-slate-400">•</span> Note: ATS-friendly templates don't display photos</li>
          </ul>
        </div>
      </div>

      {/* Professional Links Card */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-200/80 p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-bold text-slate-900">Professional Links (Optional)</h2>
            <p className="text-slate-500 text-[13px] mt-0.5">Add your professional profiles and websites</p>
          </div>
          {!showLinks && (
            <Button variant="outline" size="sm" onClick={() => setShowLinks(true)} className="h-9 px-3 rounded-lg border-slate-300 font-semibold text-slate-700">
              <Plus className="w-4 h-4 mr-1.5" /> Add Links
            </Button>
          )}
        </div>
        
        {showLinks && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="space-y-2">
              <Label htmlFor="linkedIn" className="text-[13px] font-semibold text-slate-700 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-blue-600" /> LinkedIn
              </Label>
              <Input id="linkedIn" type="url" {...register("linkedIn")} placeholder="https://linkedin.com/in/username" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
              {errors.linkedIn && <p className="text-red-500 text-xs mt-1">{errors.linkedIn.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="github" className="text-[13px] font-semibold text-slate-700 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-slate-800" /> GitHub
              </Label>
              <Input id="github" type="url" {...register("github")} placeholder="https://github.com/username" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
              {errors.github && <p className="text-red-500 text-xs mt-1">{errors.github.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="portfolio" className="text-[13px] font-semibold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" /> Portfolio / Website
              </Label>
              <Input id="portfolio" type="url" {...register("portfolio")} placeholder="https://yourportfolio.com" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
              {errors.portfolio && <p className="text-red-500 text-xs mt-1">{errors.portfolio.message}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
