export function GET(request: any) {
  console.log(request);

  return new Response(null, { status: 201 });
}
