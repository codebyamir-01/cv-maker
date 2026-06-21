import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useRef } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Trash2 } from "lucide-react";

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  jobTitle: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedIn: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: resumeData.personalInfo,
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      updatePersonalInfo(value as PersonalInfoValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, updatePersonalInfo]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePersonalInfo({ photo: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            <Label htmlFor="fullName" className="text-[13px] font-semibold text-slate-700">First Name <span className="text-red-500">*</span></Label>
            <Input id="fullName" {...register("fullName")} placeholder="Amir" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-[13px] font-semibold text-slate-700">Last Name <span className="text-red-500">*</span></Label>
            <Input id="lastName" placeholder="Khan" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
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
            <Input id="city" {...register("location")} placeholder="Rawalpindi" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-[13px] font-semibold text-slate-700">Country <span className="text-red-500">*</span></Label>
            <Input id="country" placeholder="Pakistan" className="h-[46px] bg-white border-slate-200 focus-visible:ring-blue-500" />
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
            accept="image/png, image/jpeg, image/jpg" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />
          
          {resumeData.personalInfo.photo ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resumeData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold h-9 px-4 rounded-lg">
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
              <p className="text-[11px] text-slate-500 mb-4">JPG or PNG (Max 3MB)<br/>Image will be automatically cropped to 400x400px</p>
              <Button variant="secondary" size="sm" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold h-9 px-4 rounded-lg pointer-events-none">
                <Upload className="w-3.5 h-3.5 mr-2" /> Select Photo
              </Button>
            </>
          )}
        </div>

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
        <div className="mb-5">
          <h2 className="text-[17px] font-bold text-slate-900">Professional Links (Optional)</h2>
          <p className="text-slate-500 text-[13px] mt-0.5">Add your professional profiles and websites</p>
        </div>
        
        <Button variant="outline" className="h-10 px-4 rounded-lg border-slate-300 font-semibold text-slate-700">
          Add Professional Links
        </Button>
      </div>
    </div>
  );
}
