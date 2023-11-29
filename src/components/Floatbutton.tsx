import { IconButton, Link } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const FloatButton: React.FC = () => {
  const urlAPK =
    'https://firebasestorage.googleapis.com/v0/b/xochicalli-commerce.appspot.com/o/assets%2FXochicalli%20Commerce-Movil.apk?alt=media&token=24d362ce-fd51-4078-ba67-fdaba58e907d';

  return (
    <Link href={urlAPK} download>
      <IconButton
        aria-label="Descargar APK"
        icon={<DownloadIcon />}
        size="lg"
        isRound
        position="fixed"
        bottom={12}
        left={4}
        bgColor="teal.500"
        color="white"
        _hover={{ bgColor: 'teal.600' }}
      />
    </Link>
  );
};

export default FloatButton;
