import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  // TODO: here we should setup the db connection before showing the
  // inventory to the end user

  useEffect(() => {
    router.replace('toppings');
  }, [router]);

  return null;
}
