type Props = {
  params: {
    slug: string;
  };
};

export default function BlogDetailsPage({ params }: Props) {
  return (
    <div style={{ padding: '120px 20px' }}>
      <h1>{params.slug}</h1>

      <p>Dynamic Blog Details Page</p>
    </div>
  );
}
