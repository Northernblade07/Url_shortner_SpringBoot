import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import toast from "react-hot-toast";
import { X } from 'lucide-react';




const ShortenPopup = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
  });

  const createShortUrlHandler = async (data) => {
    const res = await api.post("/api/url/shorten", data);

    const shortUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/${res.data.shortUrl}`;

    await navigator.clipboard.writeText(shortUrl);

    toast.success("Short URL copied to clipboard!", {
      position: "bottom-center",
      duration: 3000,
      className: "mb-5",
    });

    return res.data;
  };

  const createUrlMutation = useMutation({
    mutationFn: createShortUrlHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      queryClient.invalidateQueries({ queryKey: ["url-total-clicks"] });
      queryClient.invalidateQueries({ queryKey: ["url-analytics"] });
      reset();
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create short URL");
    },
  });

  const onSubmit = (data) => {
    createUrlMutation.mutate(data);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
      >
        Create a New Short Url
      </button>

      <Modal open={open} onClose={() => !createUrlMutation.isPending && setOpen(false)}>
        <Box
          sx={{
            width: 420,
            bgcolor: "#0b0b1e",
            color: "white",
            p: 4,
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.2)",
            mx: "auto",
            mt: "15%",
            position: "relative",
          }}
        >
          <Typography variant="h6" mb={2}>
            Create Short URL
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Enter URL"
              placeholder="https://example.com"
              variant="filled"
              type="url"
              error={!!errors.originalUrl}
              helperText={errors.originalUrl?.message}
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
              }}
              {...register("originalUrl", {
                required: "URL is required",
                pattern: {
                  value: /^(https?:\/\/)/,
                  message: "Must start with http:// or https://",
                },
              })}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              disabled={createUrlMutation.isPending}
            >
              {createUrlMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </form>

          <Tooltip title="Close">
            <button
              className="absolute right-3 top-2 text-white text-xl"
              disabled={createUrlMutation.isPending}
              onClick={() => setOpen(false)}
            >
              <X/>

            </button>
          </Tooltip>
        </Box>
      </Modal>
    </>
  );
};

export default ShortenPopup;
