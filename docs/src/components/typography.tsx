import { cn } from "@/lib/utils";

// H1 Component - Main heading style like Sungrow Power
export function H1({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn(
      "text-4xl md:text-6xl font-bold leading-tight tracking-tight font-montserrat",
      className
    )}>
      {children}
    </h1>
  );
}

// H2 Component - Section heading style like Sungrow Power
export function H2({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn(
      "text-3xl md:text-5xl font-bold leading-tight tracking-tight font-montserrat",
      className
    )}>
      {children}
    </h2>
  );
}

// H3 Component - Subsection heading style like Sungrow Power
export function H3({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn(
      "text-2xl md:text-4xl font-semibold leading-snug font-montserrat",
      className
    )}>
      {children}
    </h3>
  );
}

// H4 Component
export function H4({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <h4 className={cn(
      "text-xl md:text-2xl font-semibold",
      className
    )}>
      {children}
    </h4>
  );
}

// H5 Component
export function H5({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <h5 className={cn(
      "text-lg md:text-xl font-medium",
      className
    )}>
      {children}
    </h5>
  );
}

// H6 Component
export function H6({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <h6 className={cn(
      "text-base md:text-lg font-medium",
      className
    )}>
      {children}
    </h6>
  );
}

// Paragraph Component - Body text style like Sungrow Power
export function P({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn(
      "text-base md:text-lg leading-relaxed font-roboto font-normal",
      className
    )}>
      {children}
    </p>
  );
}

// Strong/Bold Component
export function Strong({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <strong className={cn(
      "font-bold",
      className
    )}>
      {children}
    </strong>
  );
}

// Link Component
export function Link({ 
  children, 
  href,
  className 
}: { 
  children: React.ReactNode; 
  href: string;
  className?: string; 
}) {
  return (
    <a 
      href={href}
      className={cn(
        "text-green-600 hover:text-green-700 underline transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
}

// Text Small Component
export function Small({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <p className={cn(
      "text-sm leading-relaxed",
      className
    )}>
      {children}
    </p>
  );
}

// Text Extra Small Component
export function XSmall({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <p className={cn(
      "text-xs leading-relaxed",
      className
    )}>
      {children}
    </p>
  );
}