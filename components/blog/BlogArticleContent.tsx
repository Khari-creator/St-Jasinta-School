type BlogArticleContentProps = {
  content: string;
};

export default function BlogArticleContent({ content }: BlogArticleContentProps) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6 text-lg leading-9 text-slate-700">
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
      ))}
    </div>
  );
}
