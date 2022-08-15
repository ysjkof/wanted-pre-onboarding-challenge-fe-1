interface TodoTitleContentProps {
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
}

export default function TodoContent({
  createdAt,
  updatedAt,
  title,
  content,
}: TodoTitleContentProps) {
  return (
    <>
      <h3 className="font-semibold">제목: {title}</h3>
      <span className="text-sm text-gray-500">생성: {createdAt}</span>
      <span className="text-sm text-gray-500">수정: {updatedAt}</span>
      <p className="px-4 pt-1">{content}</p>
    </>
  );
}