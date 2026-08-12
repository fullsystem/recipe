import {Head} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Starter() {
  return (
    <>
      <Head title="Starter"/>

      <div className="flex item-center justify-center h-screen">
        <h1>Starter</h1>
      </div>
    </>
  );
}

Starter.layout = [AppLayout];
