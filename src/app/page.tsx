'use client';

import { useState } from 'react';
import { type ParseResumeOutput } from '@/ai/flows/parse-resume';
import { ResumeDisplay } from '@/components/resume-display';
import { ResumeForm } from '@/components/resume-form';
import { StylePresets, type StylePreset } from '@/components/style-presets';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/icons';

export default function Home() {
  const [parsedData, setParsedData] = useState<ParseResumeOutput | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StylePreset>('modern');

  // In a real application, this data would likely be part of the form.
  const [personalInfo, setPersonalInfo] = useState({
      name: 'Your Name',
      email: 'your.email@example.com',
      phone: '(555) 123-4567',
      location: 'City, State'
  });

  return (
      <div className="min-h-screen bg-background font-body text-foreground">
        <header className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Logo className="h-7 w-7 text-primary" />
              <h1 className="text-2xl font-bold font-headline text-primary">ResumeCraft</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Powered by AI</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-8">
              <ResumeForm
                onFormSubmit={setParsedData}
                onPhotoChange={setPhoto}
              />
              <Separator />
              <StylePresets
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
              />
            </div>

            <div className="lg:col-span-8">
              <div className="sticky top-24">
                <ResumeDisplay
                  data={parsedData}
                  photo={photo}
                  style={selectedStyle}
                  personalInfo={personalInfo}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
