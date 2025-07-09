'use client';

import Image from 'next/image';
import type { ParseResumeOutput } from '@/ai/flows/parse-resume';
import type { StylePreset } from './style-presets';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, GraduationCap, Lightbulb, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

interface ResumeDisplayProps {
  data: ParseResumeOutput | null;
  photo: string | null;
  style: StylePreset;
  personalInfo: { name: string; email: string; phone: string; location: string };
}

const placeholderData: ParseResumeOutput = {
  skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL'],
  experience: [
    'Software Engineer at AI Corp (2021-Present): Building intelligent web applications with the latest technologies.',
    'Frontend Developer at Web Solutions (2019-2021): Created responsive and accessible user interfaces for various clients.',
  ],
  education: ['B.Sc. in Computer Science from Innovate University (2015-2019)'],
};

const styleConfig: Record<StylePreset, { container: string; h1: string; h2: string; icon: string }> = {
    classic: {
        container: 'font-body',
        h1: 'text-4xl font-bold font-headline border-b-2 pb-2 mb-6',
        h2: 'text-2xl font-bold font-headline mt-6 mb-3 border-b pb-1',
        icon: 'h-5 w-5 text-primary',
    },
    modern: {
        container: 'font-body',
        h1: 'text-5xl font-extrabold tracking-tight font-headline mb-4 text-primary',
        h2: 'text-xl font-semibold mt-8 mb-4 uppercase tracking-wider font-headline text-muted-foreground',
        icon: 'h-4 w-4 text-primary/80',
    },
    creative: {
        container: 'font-headline',
        h1: 'text-3xl font-medium mb-1',
        h2: 'text-lg font-medium mt-6 mb-2 text-primary',
        icon: 'h-5 w-5 text-primary',
    }
}

export function ResumeDisplay({ data, photo, style, personalInfo }: ResumeDisplayProps) {
  const resumeData = data || placeholderData;
  const styles = styleConfig[style];

  const renderSection = (title: string, items: string[] | undefined, Icon: React.ElementType) => (
    items && items.length > 0 && (
      <section>
        <h2 className={cn("flex items-center gap-3", styles.h2)}>
            <Icon className={styles.icon}/>
            <span>{title}</span>
        </h2>
        <ul className="list-none space-y-3 pt-2 ml-4 border-l-2 border-border pl-6">
          {items.map((item, index) => (
            <li key={index} className="text-card-foreground/90 relative before:content-[''] before:absolute before:left-[-28px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
              {item}
            </li>
          ))}
        </ul>
      </section>
    )
  );

  return (
    <Card className={cn("w-full h-full min-h-[800px] overflow-auto shadow-lg transition-all duration-300", styles.container)}>
      <CardContent className="p-8 md:p-12">
        <header className="flex flex-col sm:flex-row gap-8 items-center mb-8">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0">
            {photo ? (
              <Image
                src={photo}
                alt="User photo"
                fill
                className="rounded-full object-cover border-4 border-card shadow-md"
                data-ai-hint="person portrait"
              />
            ) : (
                <Skeleton className="w-full h-full rounded-full" />
            )}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className={cn(styles.h1)}>{personalInfo.name}</h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 mt-4 text-muted-foreground">
                <span className="flex items-center gap-2"><Mail className="h-4 w-4"/> {personalInfo.email}</span>
                <span className="flex items-center gap-2"><Phone className="h-4 w-4"/> {personalInfo.phone}</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {personalInfo.location}</span>
            </div>
          </div>
        </header>

        <Separator className="my-8" />
        
        <div className="space-y-8">
            {renderSection('Skills', resumeData.skills, Lightbulb)}
            {renderSection('Experience', resumeData.experience, Briefcase)}
            {renderSection('Education', resumeData.education, GraduationCap)}
        </div>
      </CardContent>
    </Card>
  );
}
