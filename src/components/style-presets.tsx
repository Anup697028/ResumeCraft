'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export type StylePreset = 'classic' | 'modern' | 'creative';

const presets: { id: StylePreset; name: string }[] = [
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classic' },
  { id: 'creative', name: 'Creative' },
];

interface StylePresetsProps {
  selectedStyle: StylePreset;
  onStyleChange: (style: StylePreset) => void;
}

export function StylePresets({ selectedStyle, onStyleChange }: StylePresetsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Style Presets</CardTitle>
        <CardDescription>
            Quickly preview your resume with different fonts and heading styles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.id}
              variant={selectedStyle === preset.id ? 'default' : 'outline'}
              onClick={() => onStyleChange(preset.id)}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
