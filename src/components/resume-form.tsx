'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleResumeParsing, type State } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

interface ResumeFormProps {
  onFormSubmit: (data: any) => void;
  onPhotoChange: (url: string | null) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Crafting...' : 'Craft Resume'}
    </Button>
  );
}

export function ResumeForm({ onFormSubmit, onPhotoChange }: ResumeFormProps) {
  const initialState: State = { message: null, data: null, fieldErrors: {} };
  const [state, formAction] = useFormState(handleResumeParsing, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const txtInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.data) {
        toast({ title: 'Success!', description: state.message });
        onFormSubmit(state.data);
      } else {
        const errorDescription = state.fieldErrors?.resumeText?.join(', ') || state.message;
        toast({
          title: 'Error Parsing Resume',
          description: errorDescription,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, onFormSubmit]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const newPhotoUrl = URL.createObjectURL(file);
      onPhotoChange(newPhotoUrl);
    } else {
        onPhotoChange(null);
    }
  };

  const handleUploadTxtClick = () => {
    txtInputRef.current?.click();
  };

  const handleTxtFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const textarea = formRef.current?.elements.namedItem('resumeText') as HTMLTextAreaElement;
        if (textarea) {
          textarea.value = text;
        }
      };
      reader.readAsText(file);
    } else if (file) {
      toast({ title: 'Invalid File', description: 'Please select a .txt file.', variant: 'destructive' });
    }
  };

  return (
    <form action={formAction} ref={formRef} className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Create Your Resume</CardTitle>
                <CardDescription>Upload a photo and your resume text to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="photo">Your Photo</Label>
                    <Input id="photo" name="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="resumeText">Resume Content</Label>
                     <div className="relative">
                        <Textarea
                            id="resumeText"
                            name="resumeText"
                            placeholder="Paste the full text of your resume here..."
                            rows={15}
                            className="pr-12"
                        />
                        <button type="button" onClick={handleUploadTxtClick} className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-primary rounded-md transition-colors" aria-label="Upload .txt file">
                            <Upload className="h-5 w-5"/>
                        </button>
                        <Input type="file" ref={txtInputRef} onChange={handleTxtFileSelected} accept=".txt" className="hidden" />
                    </div>
                     {state.fieldErrors?.resumeText && (
                        <p className="text-sm font-medium text-destructive">
                            {state.fieldErrors.resumeText[0]}
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <SubmitButton />
            </CardFooter>
        </Card>
    </form>
  );
}
