"use server";
export async function getHost(id) {
  try {
    const hostRes = await fetch(
      `${process.env.NEXTAUTH_URL}/api/hosts/${id.data}`
    );
    const hostData = await hostRes.json();
    return hostData;
  } catch (error) {
    return new Response(error.message);
  }
}
