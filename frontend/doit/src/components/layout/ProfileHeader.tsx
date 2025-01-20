import { Button } from "@/components/ui/Button";
import { MdOutlineEdit } from "react-icons/md";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface ProfileHeaderProps {
    name: string;
    role: string;
    city: string;
    imageUrl: string;
    isAvailable?: boolean;
}

export const ProfileHeader = ({
                                  name,
                                  role,
                                  city,
                                  imageUrl,
                                  isAvailable,
                              }: ProfileHeaderProps) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/form/${role}`);
    };

    return (
        <div className="flex items-start justify-between pt-16 md:pt-0 w-full lg:flex-row flex-col">
            <div className="flex items-center space-x-12">
                <div className="relative">
                    <Image
                        src={imageUrl}
                        alt="Profile picture"
                        className="w-36 h-36 object-cover rounded-full shadow-lg"
                        width={144}
                        height={144}
                        priority
                    />
                    {isAvailable !== undefined && (
                        <span
                            className={`absolute bottom-3 right-3 w-4 h-4 rounded-full ${
                                isAvailable ? "bg-green-500" : "bg-red-500"
                            }`}
                            title={isAvailable ? "Available" : "Unavailable"}
                        />
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold">{name}</h2>
                    <p className="text-lg text-muted-foreground">{role}</p>
                    <p className="text-sm text-muted-foreground">{city}</p>
                </div>
            </div>
            <Button
                variant="secondary"
                size="default"
                className="mt-0 ml-48 lg:mt-12"
                onClick={handleEdit}
            >
                <MdOutlineEdit className="mr-2" />
                Modifica
            </Button>
        </div>
    );
};
