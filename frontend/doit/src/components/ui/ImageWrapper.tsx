"use client";

import Image, { ImageProps } from "next/image";
import { BASE_PATH } from '@/utils/constants';

interface EnhancedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    readonly src: string;
    readonly alt: string;
}

export function ImageWrapper(props: Readonly<EnhancedImageProps>) {
    const normalizedSrc = props.src.startsWith('/') ? props.src : `/${props.src}`;
    const fullPath = `${BASE_PATH}${normalizedSrc}`;

    if (process.env.NODE_ENV === 'development') {
        console.log('BASE_PATH:', BASE_PATH);
        console.log('Full image path:', fullPath);
    }

    return (
        <Image
            {...props}
            src={fullPath}
            alt={props.alt}
        />
    );
}
