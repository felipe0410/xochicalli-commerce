import { db } from "@/firebase";
import { Comment } from "@/interfaces";
import { getComments } from "@/utils";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
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
      deleted: false,
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

  const handleDelete = async (id: string) => {
    const filteredComments = comments.filter((comment) => comment.id !== id);

    setComments(filteredComments);
    try {
      const docComments = query(collection(db, "comments"));
      const querySnapshot = await getDocs(docComments);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((commentDoc) => {
          const commentData = commentDoc.data();
          const commentID = commentData.id;

          if (commentID === id) {
            deleteDoc(doc(db, "comments", commentDoc.id));
            console.log("Comentario eliminado de Firebase");
          }
        });
      } else {
        console.log('No se encontraron documentos en la colección "comments"');
      }
    } catch (error) {
      console.error("Error al eliminar el comentario en Firebase", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const data: Comment[] | any = await getComments();
      setComments(data);
    };

    fetchComments();
  }, []);

  return (
    <Box style={{ minHeight: "72.7vh" }} id='container comments'>
      <Heading mt={2} textAlign={"center"}>
        Comentarios
      </Heading>
      <Box
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {comments.length === 0 ? (
          <Text fontSize='2xl' mt={6}>
            No hay comentarios para mostrar
          </Text>
        ) : (
          comments?.map((comment) => (
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
                <Avatar
                  src={"" as string}
                  name={"commentInfo?.name" as string}
                />
                <Text fontWeight={600}>
                  {comment.name} {comment.fatherSurname}
                </Text>
              </Stack>
              <Text noOfLines={3} my={2}>
                {comment.comment}
              </Text>
              <Text fontWeight={600}>
                Fecha: {new Date().toLocaleDateString()}
              </Text>
              <ButtonGroup spacing={6} mt={2}>
                <Button
                  colorScheme='purple'
                  onClick={() => handleChecked(comment.id)}
                >
                  {comment.checked === false ? "Agregar" : "Cancelar"}
                </Button>
                <Button
                  colorScheme='purple'
                  onClick={() => handleDelete(comment.id)}
                >
                  Eliminar
                </Button>
              </ButtonGroup>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Comentarios;
