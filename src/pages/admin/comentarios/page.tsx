import { db } from "@/firebase";
import { Comment } from "@/interfaces";
import { getComments } from "@/utils";
import { Avatar, Box, Button, Stack, Text } from "@chakra-ui/react";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Comentarios = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      checked: false,
      comment: "",
      createdAt: "",
      fatherSurname: "",
      name: "",
      product: "",
      id: "",
    },
  ]);

  const handleChecked = async (id: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        const newComment = { ...comment };
        newComment.checked = !newComment.checked;
        return newComment;
      }
      return comment;
    });
    setComments(updatedComments);

    // Actualiza el comentario en Firebase
    try {
      const docComments = query(collection(db, "comments"));

      const querySnapshot = await getDocs(docComments);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((commentDoc) => {
          const commentData = commentDoc.data();
          const commentID = commentData.id;

          if (commentID === id) {
            updateDoc(doc(db, "comments", commentDoc.id), {
              checked: !commentData.checked,
            });

            console.log("Comentario actualizado en Firebase");
          }
        });
      } else {
        console.log('No se encontraron documentos en la colección "comments"');
      }
    } catch (error) {
      console.error("Error al actualizar el comentario en Firebase", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments();
      setComments(data);
    };

    fetchComments();
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {comments?.map((comment) => (
        <Box
          key={comment.id}
          p={4}
          marginY={"20px"}
          borderRadius='md'
          bgColor='gray.100'
          minWidth={["full", 350]}
          maxWidth={["full", 350]}
        >
          <Stack direction='row' alignItems='center'>
            <Avatar src={"" as string} name={"commentInfo?.name" as string} />
            <Text fontWeight={600}>
              {comment.name} {comment.fatherSurname}
            </Text>
          </Stack>
          <Text noOfLines={3} my={2}>
            {comment.comment}
          </Text>
          <Text fontWeight={600}>Fecha: {new Date().toLocaleDateString()}</Text>
          <Button onClick={() => handleChecked(comment.id)}>
            {comment.checked === false ? "Agregar" : "Cancelar"}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Comentarios;
