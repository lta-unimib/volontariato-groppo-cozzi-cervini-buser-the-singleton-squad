"use client";

import Image, { ImageProps } from "next/image";

interface EnhancedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    readonly src: string;
    readonly alt: string;
}

export function ImageWrapper(props: Readonly<EnhancedImageProps>) {
    const repositoryName = 'volontariato-groppo-cozzi-cervini-buser-the-singleton-squad';
    const basePath = process.env.GITHUB_PAGES ? `/${repositoryName}` : '';

    return (
        <Image
            {...props}
            src={`${basePath}${props.src}`}
            alt={props.alt}
        />
    );
}