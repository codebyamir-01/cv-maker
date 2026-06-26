import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useResumeStore, Experience } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [currentExp, setCurrentExp] = useState<Partial<Experience>>({});

  const handleAddNew = () => {
    const newId = Date.now().toString();
    const newExp: Experience = {
      id: newId,
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    };
    addExperience(newExp);
    setIsEditing(newId);
    setCurrentExp(newExp);
  };

  const handleEdit = (exp: Experience) => {
    setIsEditing(exp.id);
    setCurrentExp(exp);
  };

  const handleSave = () => {
    setIsEditing(null);
  };

  const handleChange = (key: keyof Experience, value: string | boolean) => {
    setCurrentExp(prev => {
      const next = { ...prev, [key]: value };
      if (isEditing) {
        updateExperience(isEditing, next);
      }
      return next;
    });
  };

  const handleDelete = (id: string) => {
    removeExperience(id);
    if (isEditing === id) {
      setIsEditing(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Work Experience</h2>
          <p className="text-slate-500 mt-1">List your relevant experience, starting with the most recent.</p>
        </div>
        <Button onClick={handleAddNew} variant="outline" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.experience.map((exp) => (
          <div key={exp.id}>
            {isEditing === exp.id ? (
              <div className="p-6 bg-white border border-blue-200 rounded-xl shadow-sm space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input 
                      value={currentExp.jobTitle || ""} 
                      onChange={(e) => handleChange("jobTitle", e.target.value)}
                      placeholder="e.g. Senior Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input 
                      value={currentExp.company || ""} 
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="e.g. Google"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input 
                      value={currentExp.location || ""} 
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="e.g. New York, USA"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input 
                        value={currentExp.startDate || ""} 
                        onChange={(e) => handleChange("startDate", e.target.value)}
                        placeholder="e.g. Jan 2020"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input 
                        value={currentExp.endDate || ""} 
                        onChange={(e) => handleChange("endDate", e.target.value)}
                        placeholder="e.g. Present"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label>Description (Bullet Points)</Label>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Try to use action verbs!</span>
                  </div>
                  <Textarea 
                    value={currentExp.description || ""} 
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="• Developed new features...&#10;• Improved performance by 20%..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="ghost" onClick={() => setIsEditing(null)}>Cancel</Button>
                  <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">Save Experience</Button>
                </div>
              </div>
            ) : (
              <div className="group p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex justify-between items-start cursor-pointer" onClick={() => handleEdit(exp)}>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{exp.jobTitle || "(Not specified)"}</h3>
                  <p className="text-slate-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-slate-400 mt-1">{exp.startDate} - {exp.endDate}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-slate-500 hover:text-red-600"
                    onClick={(e) => { e.stopPropagation(); handleDelete(exp.id); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        {resumeData.experience.length === 0 && !isEditing && (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
            <p className="text-slate-500 mb-4">No experience added yet</p>
            <Button onClick={handleAddNew} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-2" /> Add Your First Role
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
