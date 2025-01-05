"use client";

import Image, { ImageProps } from "next/image";
import { useBasePath } from '@/hooks/useBasePath';

interface EnhancedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    readonly src: string;
    readonly alt: string;
}

export function ImageWrapper(props: Readonly<EnhancedImageProps>) {
    const basePath = useBasePath() || '';

    const srcPath = `${basePath}${props.src}`;

    console.log('Base Path:', basePath);
    console.log('Image src:', props.src);
    console.log('Combined Path:', srcPath);

    return (
        <Image
            {...props}
            src={srcPath}
            alt={props.alt}
        />
    );
}