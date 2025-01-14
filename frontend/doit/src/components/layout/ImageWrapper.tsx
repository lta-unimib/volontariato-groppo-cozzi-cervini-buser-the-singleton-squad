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

    return (
        <Image
            {...props}
            src={srcPath}
            alt={props.alt}
        />
    );
}