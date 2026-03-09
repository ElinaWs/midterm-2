import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants"
import type { IPost, IComment } from "../../../types"
import { Box, Typography, Button, CircularProgress, Chip, Container, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const PostsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<IPost | null>(null);
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
        try {
            const res = await fetch(`${BASE_URL}/posts/${id}`);
            if (!res.ok) throw new Error("Post's Error!");
            const data = await res.json();
            setPost(data);
        } catch (err) {
            console.log(err);
        }
        };

        const fetchComments = async () => {
        try {
            const res = await fetch(`${BASE_URL}/posts/${id}/comments`);
            if (!res.ok) throw new Error("Comments's Error!");
            const data = await res.json();
            setComments(data.comments || []);
        } catch (err) {
            console.log(err);
        }
        };

        Promise.all([fetchPost(), fetchComments()]).finally(() =>
        setLoading(false)
        );
    }, [id]);

    if (loading) {
        return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
        </Box>
        );
    }

    if (!post) {
        return (
        <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" sx={{ color: "#100038" }}>
            Error 404!
            </Typography>
        </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
            <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                color: "#100038",
                borderColor: "#b5c6e9",
                "&:hover": {
                backgroundColor: "rgba(181, 198, 233, 0.26)",
                borderColor: "#b5c6e9",
                },
            }}
            >
            Back
            </Button>
        </Box>

        <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: 600, color: "#100038" }}
        >
            {post.title}
        </Typography>

        <Typography
            variant="body1"
            sx={{ mb: 4, whiteSpace: "pre-wrap", color: "#100038" }}
        >
            {post.body}
        </Typography>

        <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
            <Typography color="success.main">
            Likes: <strong>{post.reactions.likes}</strong>
            </Typography>
            <Typography color="error.main">
            Dislikes: <strong>{post.reactions.dislikes}</strong>
            </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
            {post.tags.map((tag) => (
            <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                sx={{
                bgcolor: "#b5c6e9ff",
                color: "#100038",
                fontWeight: 500,
                }}
            />
            ))}
        </Box>

        <Link to={`/user/${post.userId}`} style={{ textDecoration: "none" }}>
            <Button
            variant="outlined"
            size="small"
            sx={{
                color: "#100038",
                borderColor: "#b5c6e9",
                backgroundColor: "rgba(181, 198, 233, 0.26)",
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                "&:hover": {
                backgroundColor: "rgba(181, 198, 233, 0.40)",
                borderColor: "#b5c6e9",
                },
            }}
            >
            Show all posts
            </Button>
        </Link>

        <Divider sx={{ my: 5, borderColor: "rgba(181, 198, 233, 0.3)" }} />

        <Typography
            variant="h5"
            sx={{ mt: 6, mb: 3, color: "#100038" }}
        >
            Comments ({comments.length})
        </Typography>

        {comments.length === 0 ? (
            <Typography sx={{ color: "#100038", fontStyle: "italic" }}>
            Np commets yet
            </Typography>
        ) : (
            comments.map((comment) => (
            <Box
                key={comment.id}
                sx={{
                mb: 3,
                p: 3,
                bgcolor: "rgba(181, 198, 233, 0.15)",
                borderRadius: 2,
                borderLeft: "4px solid #b5c6e9ff",
                }}
            >
                <Typography variant="body1" sx={{ mb: 1.5, color: "#100038" }}>
                {comment.body}
                </Typography>

                <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                >
                <Typography variant="caption" color="success.main">
                    Likes: {comment.likes}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{ color: "#100038", fontWeight: 500 }}
                >
                    {comment.user.fullName}
                </Typography>
                </Box>
            </Box>
            ))
        )}
        </Container>
    );
};