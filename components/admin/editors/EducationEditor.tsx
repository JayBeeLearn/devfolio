import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { PortfolioData } from '../../../types';

interface EducationEditorProps {
  education: PortfolioData['education'];
  professionalCourses: PortfolioData['professionalCourses'];
  onUpdateEducation: (education: PortfolioData['education']) => void;
  onUpdateCertifications: (certs: PortfolioData['professionalCourses']) => void;
}

const EducationEditor: React.FC<EducationEditorProps> = ({ 
  education, 
  professionalCourses, 
  onUpdateEducation, 
  onUpdateCertifications 
}) => {
  const addEducation = () => {
    onUpdateEducation([
      ...education, 
      { school: 'University Name', course: 'Course Name', year: '2020-2024', cgpa: 4.0, class: 'First Class' }
    ]);
  };

  const removeEducation = (idx: number) => {
    onUpdateEducation(education.filter((_, i) => i !== idx));
  };

  const updateEducation = (idx: number, field: string, value: any) => {
    const next = [...education];
    (next[idx] as any)[field] = value;
    onUpdateEducation(next);
  };

  const addCertification = () => {
    onUpdateCertifications([
      ...professionalCourses, 
      { certification: 'Course Name', institution: 'Organization', year: '2024', skills: [] }
    ]);
  };

  const removeCertification = (idx: number) => {
    onUpdateCertifications(professionalCourses.filter((_, i) => i !== idx));
  };

  const updateCertification = (idx: number, field: string, value: any) => {
    const next = [...professionalCourses];
    (next[idx] as any)[field] = value;
    onUpdateCertifications(next);
  };

  return (
    <div className="space-y-12">
      {/* Education Section */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <h3 className="text-2xl font-black">Education</h3>
          <button 
            onClick={addEducation}
            className="flex items-center gap-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
          >
            <Plus size={16} /> Add Education
          </button>
        </div>
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 relative group">
              <button 
                onClick={() => removeEducation(idx)}
                className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={20} />
              </button>
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" value={edu.school} placeholder="School"
                  onChange={(e) => updateEducation(idx, 'school', e.target.value)}
                  className="bg-transparent font-bold outline-none"
                />
                <input 
                  type="text" value={edu.course} placeholder="Course"
                  onChange={(e) => updateEducation(idx, 'course', e.target.value)}
                  className="bg-transparent outline-none"
                />
                <input 
                  type="text" value={edu.year} placeholder="Year Range"
                  onChange={(e) => updateEducation(idx, 'year', e.target.value)}
                  className="bg-transparent text-sm text-zinc-500 outline-none"
                />
                <div className="flex gap-4">
                  <input 
                    type="number" value={edu.cgpa || ''} placeholder="CGPA"
                    onChange={(e) => updateEducation(idx, 'cgpa', parseFloat(e.target.value))}
                    className="w-20 bg-transparent text-sm outline-none border-b border-zinc-200 dark:border-zinc-700"
                  />
                  <input 
                    type="text" value={edu.class || ''} placeholder="Class"
                    onChange={(e) => updateEducation(idx, 'class', e.target.value)}
                    className="bg-transparent text-sm outline-none border-b border-zinc-200 dark:border-zinc-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Courses Section */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <h3 className="text-2xl font-black">Certifications</h3>
          <button 
            onClick={addCertification}
            className="flex items-center gap-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
          >
            <Plus size={16} /> Add Certification
          </button>
        </div>
        <div className="space-y-6">
          {professionalCourses.map((cert, idx) => (
            <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 relative group">
              <button 
                onClick={() => removeCertification(idx)}
                className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={20} />
              </button>
              <div className="grid md:grid-cols-3 gap-4">
                <input 
                  type="text" value={cert.certification} placeholder="Certification"
                  onChange={(e) => updateCertification(idx, 'certification', e.target.value)}
                  className="bg-transparent font-bold outline-none md:col-span-1"
                />
                <input 
                  type="text" value={cert.institution} placeholder="Institution"
                  onChange={(e) => updateCertification(idx, 'institution', e.target.value)}
                  className="bg-transparent outline-none"
                />
                <input 
                  type="text" value={cert.year} placeholder="Year"
                  onChange={(e) => updateCertification(idx, 'year', e.target.value)}
                  className="bg-transparent outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationEditor;
