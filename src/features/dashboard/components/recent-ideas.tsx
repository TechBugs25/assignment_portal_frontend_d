import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IProps {
    category: string;
    title: string;
    author: string;
    time: string;
    image: string;
}

export function IdeaCard({ category, title, author, time, image }: IProps) {
    return (
        <div className="bg-card p-4 rounded-xl border border-border space-y-3">
            <div className="flex justify-between items-center">
                <Badge variant="secondary" className="bg-primary/20 text-primary uppercase text-[10px]">
                    {category}
                </Badge>
                <span className="text-muted-foreground text-[10px]">{time}</span>
            </div>
            <h4 className="font-semibold text-sm leading-snug">{title}</h4>
            <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                    <AvatarImage src={image} />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">by {author}</span>
            </div>
        </div>
    );
}