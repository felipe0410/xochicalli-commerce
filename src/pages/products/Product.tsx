import { FC, lazy, Suspense, useContext, useEffect } from 'react'

import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Box, VStack, Heading, Stack,
    Text, Button, useToast, useMediaQuery, IconButton, Input, FormControl, FormLabel, Textarea, FormErrorMessage
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ProductSkeleton } from '@/components/skeleton';
import { Comment } from '@/components/ui';
import { useComments, useProduct } from '@/hooks';
import { CommentInfo } from '@/interfaces';
import { addComment } from '@/utils';
import { UserContext } from '@/context';

const ProductView = lazy(() => import('@/components/products/ProductView'));

const Product: FC = (): JSX.Element => {
    const toast = useToast();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { product, loading } = useProduct(id as string);

    const { comments, loading: loadingComments } = useComments(product?.title as string);

    const guestSchema = yup.object().shape({
        name: yup
            .string()
            .required('El nombre es requerido')
            .min(4, 'El nombre debe tener mínimo 4 caracteres'),
        fatherSurname: yup
            .string()
            .required('El apellido paterno es requerido')
            .min(4, 'El apellido debe tener mínimo 4 caracteres'),
        comment: yup
            .string()
            .required('El comentario es requerido')
            .min(6, 'El comentario debe tener mínimo 6 caracteres'),
    });

    const userSchema = yup.object().shape({
        comment: yup
            .string()
            .required('El comentario es requerido')
            .min(6, 'El comentario debe tener mínimo 6 caracteres'),
    });

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<CommentInfo>({
        resolver: yupResolver(user ? userSchema : guestSchema)
    });

    const onSubmit: SubmitHandler<CommentInfo> = async (values) => {
        try {
            toast({
                status: 'success',
                duration: 1500,
                isClosable: false,
                title: 'Añadir comentario',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: 'Se ha añadido tu comentario'
            })
            reset()
            user
                ? await addComment(values, product?.title as string)
                : await addComment(values, product?.title as string)
        } catch ({ message }) {
            toast({
                status: 'error',
                duration: 1500,
                isClosable: false,
                title: 'Añadir comentario',
                position: isLargerThan800 ? 'bottom' : 'top-right',
                description: message as string
            })
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Box minH='calc(100vh - 72px)' bgColor='gray.100' p={4}>
            <Helmet>
                <title>{`Producto: ${product?.title === undefined ? 'Cargando...' : product.title}`}</title>
            </Helmet>
            <Breadcrumb pt={2} pb={6} ml={[0, 0, 16, 24]}>
                {
                    isLargerThan800 && <BreadcrumbItem>
                        <IconButton aria-label='back' icon={<FiArrowLeft />} onClick={() => navigate(-1)} />
                    </BreadcrumbItem>
                }
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/'>Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/products'>Productos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={`/products/${id}`}>{id}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Center>
                <Box bgColor='white' p={4} borderRadius='lg'>
                    {
                        loading
                            ? <ProductSkeleton />
                            : <Stack direction='column' gap={16} width={[350, 'md', '2xl', '4xl', '7xl']} minHeight='xl' as='main'>
                                <Suspense fallback={<ProductSkeleton />}>
                                    <ProductView id={id as string}
                                        category={product?.category as string}
                                        description={product?.description as string}
                                        image={product?.image as string}
                                        price={product?.price as number}
                                        title={product?.title as string}
                                        stock={product?.stock as number}
                                    />
                                </Suspense>
                                <Box bgColor='white' p={6} borderRadius='lg' boxShadow='base'>
                                    <Heading fontSize={[20, 24, 32]} mb={4}>Comentarios sobre el producto</Heading>
                                    <Stack as='article'
                                        direction='row'
                                        gap={4} width='full' justifyContent='center'
                                        py={4} flexWrap='wrap'
                                    >
                                        {
                                            loadingComments
                                                ? <Heading>Cargando...</Heading>
                                                : comments && comments.length === 0
                                                    ? <Text fontWeight={500} fontSize='xl' textAlign='center' py={8}>Aún no hay comentarios sobre este producto</Text>
                                                    : comments.map(comment => (
                                                        <Comment {...comment} key={comment.id} />
                                                    ))
                                        }
                                    </Stack>
                                    <Box bgColor='white'>
                                        <Heading fontSize={[20, 24, 32]} my={2}>Deja un comentario</Heading>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <VStack
                                                gap={4} p={[0, 0, 8]} as='article'
                                                alignItems='flex-start' justifyContent='space-between'
                                                width='75%' mx='auto'
                                            >
                                                <Stack direction={['column', 'column', 'row']} width='full' justifyContent='space-between' gap={4}>
                                                    {
                                                        (user === null || user === undefined) &&
                                                        <>
                                                            <FormControl isInvalid={!!errors.name}>
                                                                <FormLabel htmlFor='Nombre'>Nombre(s)</FormLabel>
                                                                <Input
                                                                    placeholder='Nombre'
                                                                    id='name'
                                                                    type='text'
                                                                    maxLength={35}
                                                                    {...register('name')}
                                                                />
                                                                {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                                                            </FormControl>
                                                            <FormControl isInvalid={!!errors.fatherSurname}>
                                                                <FormLabel htmlFor='Apellido'>Apellido(s)</FormLabel>
                                                                <Input
                                                                    placeholder='Apellido'
                                                                    id='fatherSurname'
                                                                    type='text'
                                                                    max={50}
                                                                    {...register('fatherSurname')}
                                                                />
                                                                {errors.fatherSurname && <FormErrorMessage>{errors.fatherSurname.message}</FormErrorMessage>}
                                                            </FormControl>
                                                        </>
                                                    }
                                                </Stack>
                                                <FormControl isInvalid={!!errors.comment}>
                                                    <FormLabel htmlFor='Comentario'>Comentario</FormLabel>
                                                    <Textarea
                                                        placeholder='Me parece bastante...'
                                                        id='comment'
                                                        {...register('comment')}
                                                    />
                                                    {errors.comment && <FormErrorMessage>{errors.comment.message}</FormErrorMessage>}
                                                </FormControl>
                                                <Button
                                                    type='submit'
                                                    colorScheme='green'
                                                    isLoading={isSubmitting}
                                                >Enviar comentario</Button>
                                            </VStack>
                                        </form>
                                    </Box>
                                </Box>
                            </Stack>
                    }
                </Box>
            </Center>
        </Box>
    )
}

export default Product;