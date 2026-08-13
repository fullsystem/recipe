import { Link as InertiaLink } from '@inertiajs/react';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const linkVariants = cva(
  'clickable shrink-0 text-xs text-primary hover:underline decoration-foreground/5 underline-offset-8 transition-colors duration-300 ease-out hover:decoration-current!',
);

function Link({ viewTransition = true, className, ...props }: ComponentProps<typeof InertiaLink>) {
  return <InertiaLink className={cn(linkVariants(), className)} viewTransition={viewTransition} {...props} />;
}

export { Link, linkVariants };
