import { ResponseType } from "@/lib/types/apiResponse";
import { createRequest, getRequest, editRequest } from "@/db/connection";
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException } from "@/lib/errors/inputExceptions";

export async function PUT(request: Request) {

  try {
    const req = await request.json();
    console.log(req.requestorName);
    const newRequest = await createRequest({
        requestorName: req.requestorName,
        itemRequested: req.itemRequested,
        requestCreatedDate: new Date(),
        lastEditedDate: new Date(),
        status: "pending"
    });
    console.log(newRequest);
    return new Response(JSON.stringify(newRequest), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    if (e instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
  
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const page = parseInt(url.searchParams.get("page") || "1");
    try {
      const paginatedRequests = await getRequest(status, page);
      console.log(paginatedRequests);
      return new Response(JSON.stringify(paginatedRequests), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      if (e instanceof InputException) {
        return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
      }
      return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
    }
}

export async function PATCH(request: Request) {
    try {
      const req = await request.json();
      const editedRequest = await editRequest(req);
      console.log(editedRequest);
      return new Response(JSON.stringify(editedRequest), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      if (e instanceof InputException) {
        return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
      }
      return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
    }
  }