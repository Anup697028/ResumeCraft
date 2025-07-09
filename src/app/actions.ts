'use server';

import { parseResume, type ParseResumeOutput } from '@/ai/flows/parse-resume';
import { z } from 'zod';

const formSchema = z.object({
  resumeText: z.string().min(100, {
    message: "Resume text must be at least 100 characters.",
  }),
});

export type State = {
  message?: string | null;
  data?: ParseResumeOutput | null;
  fieldErrors?: {
    resumeText?: string[] | undefined;
  }
}

export async function handleResumeParsing(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = formSchema.safeParse({
    resumeText: formData.get('resumeText'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const parsedResume = await parseResume({ resumeText: validatedFields.data.resumeText });
    return { message: 'Resume parsed successfully.', data: parsedResume };
  } catch (error) {
    return { message: 'Failed to parse resume. Please try again.', data: null };
  }
}
