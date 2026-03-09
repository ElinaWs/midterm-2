import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants"
import type { IPost } from "../../../types"
import { PostCard } from "../../../components/PostCard/PostCard"
import { Box, Typography, Button, CircularProgress, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const UserPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPosts = async () => {
        try {
            const res = await fetch(`${BASE_URL}/posts/user/${id}`);
            if (!res.ok) throw new Error("Post's Error!");
            const data = await res.json();
            setPosts(data.posts || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
        };

        fetchUserPosts();
    }, [id]);

    if (loading) {
        return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
        </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
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

        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            User's posts #{id}
        </Typography>

        {posts.length === 0 ? (
            <Typography color="text.secondary">
            No posts yet
            </Typography>
        ) : (
            <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                },
                gap: 3,
            }}
            >
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            </Box>
        )}
        </Container>
    );
};