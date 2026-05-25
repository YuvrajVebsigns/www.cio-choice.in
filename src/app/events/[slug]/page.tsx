type Props = {
  params: {
    slug: string;
  };
};

export default function EventDetailsPage({ params }: Props) {
  return (
    <div style={{ padding: '120px 20px' }}>
      <h1>{params.slug.replace(/-/g, ' ')}</h1>
      <p>Event details for {params.slug} will be displayed here.</p>
    </div>
  );
}
