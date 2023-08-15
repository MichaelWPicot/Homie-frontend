import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    const { taskId } = req.body;

    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/tasks/${taskId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete the task");
      }

      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      const errorMessage = (error as Error).message;
      return res.status(500).json({ error: errorMessage });
    }
  }
  if (req.method === "POST") {
    const {
      taskName,
      taskDescription,
      completeByDate,
      createdUserId,
      assignedUserId,
    } = req.body;
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName,
          taskDescription,
          completeByDate,
          createdUserId,
          assignedUserId,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        let responseErrors = "";
        if (responseData.errors) {
          for (const [key, value] of Object.entries(responseData.errors)) {
            if (
              Array.isArray(value) &&
              value.every((item) => typeof item === "string")
            ) {
              responseErrors += `${key}: ${value.join(", ")}; `;
            }
          }
        }
        throw new Error(`Failed to create the task. ${responseErrors}`);
      }

      return res.status(201).json(responseData);
    } catch (error) {
      const errorMessage = (error as Error).message;
      return res.status(500).json({ error: errorMessage });
    }
  } 
  if (req.method === "PUT") {
    const {
      id,
      taskName,
      taskDescription,
      completeByDate,
      createdUserId,
      assignedUserId,
    } = req.body;

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: taskName,
          taskDescription: taskDescription,
          completeByDate: completeByDate,
          createdUserId: createdUserId,
          assignedUserId: assignedUserId
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
        throw new Error(`Failed to update the task. ${responseErrors}`);
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
