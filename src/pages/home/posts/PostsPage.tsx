import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants"
import type { IPost, IComment } from "../../../types"
import { Box, Typography, Button, CircularProgress, Chip, Container } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const PostsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [post, setPost] = useState<IPost | null>(null)
    const [comments, setComments] = useState<IComment[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const fetchPost = async () => {
        try {
            const res = await fetch(`${BASE_URL}/posts/${id}`)
            if (!res.ok) throw new Error("Post's Error!")
            const data = await res.json();
            setPost(data)
        } catch (err) {
            console.log(err)
        }
    };

    const fetchComments = async () => {
        try {
            const res = await fetch(`${BASE_URL}/posts/${id}/comments`)
            if (!res.ok) throw new Error("Comments's Error!")
            const data = await res.json()
            setComments(data.comments || [])
        } catch (err) {
            console.log(err)
        }
    };

    Promise.all([fetchPost(), fetchComments()]).finally(() => setLoading(false))
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
            <Typography variant="h5">Post's Error!</Typography>
        </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            {post.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, whiteSpace: "pre-wrap" }}>
            {post.body}
        </Typography>

        <Box sx={{ mb: 4 }}>
            <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
            }}
            >
            Back
            </Button>
        </Box>

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
            <Chip key={tag} label={`#${tag}`} 
                sx={{ bgcolor: "#b5c6e9ff", color: "#100038" }} />
            ))}
        </Box>

        <Link to={`/user/${post.userId}`}>
            <Button variant="outlined" 
            size="small"
            style={{
                color: "#100038",
                backgroundColor: "rgba(181, 198, 233, 0.26)",
                strokeColor: "#100038"
            }}
            >
            Show all posts
            </Button>
        </Link>

        <Typography variant="h5" 
            sx={{ mt: 6, mb: 3 }}>
            Comments ({comments.length})
        </Typography>

        {comments.map((comment) => (
            <Box
            key={comment.id}
            sx={{
                mb: 3,
                p: 3,
                borderRadius: 2,
                bgcolor: "#f0f6ff",
                borderLeft: "4px solid #b7d5ff"
            }}
            >
            <Typography variant="body1" sx={{ mb: 1 }}>
                {comment.body}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                Likes: {comment.likes} • {comment.user.fullName}
            </Typography>
            </Box>
        ))}
        </Container>
    );
};