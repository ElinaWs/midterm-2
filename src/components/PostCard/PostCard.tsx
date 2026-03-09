import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import type { IPost } from "../../types"

interface Props {
    post: IPost;
}

export const PostCard = ({ post }: Props) => {
    return (
        <Link to={`/posts/${post.id}`} 
            style={{ textDecoration: "none" }}>
        <Card sx={{ width: 360, height: "100%" }}
                style={{
                    backgroundColor: "#eeeffbff",
                    }}>
            <CardContent>
            <Typography variant="h6" gutterBottom>
                {post.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
                {post.body.length > 120 ? 
                post.body.slice(0, 117) + "..." : post.body}
            </Typography>

            <Typography variant="caption" color="text.secondary">
                👍likes: {post.reactions.likes} 
                👎dislikes: {post.reactions.dislikes}
            </Typography>

            <div style={{ marginTop: 12 }}>
                {post.tags.map((tag) => (
                    <span
                    key={tag}
                    style={{
                        background: "#b5c6e9ff",
                        padding: "2px 8px",
                        borderRadius: 12,
                        marginRight: 6,
                    }}
                >
                    #{tag}
                </span>
                ))}
            </div>
            </CardContent>
        </Card>
        </Link>
    );
};

