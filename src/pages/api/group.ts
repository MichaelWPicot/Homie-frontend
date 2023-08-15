import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    const {
      id,
     groupName,
     groupDescription
    } = req.body;

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/groups/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName: groupName,
          groupDescription: groupDescription
        }),
      });
     
      if (response.status!==204) {
        let responseErrors = "";
        const resData = await response.json();
        if (resData.errors) {
          for (const [key, value] of Object.entries(resData.errors)) {
            if (
              Array.isArray(value) &&
              value.every((item) => typeof item === "string")
            ) {
              responseErrors += `${key}: ${value.join(", ")}; `;
            }
          }
        }
        throw new Error(`Failed to update the group. ${responseErrors}`);
      }

      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      const errorMessage = (error as Error).message;
      return res.status(500).json({ error: errorMessage });
    }
  }  else {
    return res.status(405).end(); // Method Not Allowed
  }
  
}
