import {
    Catch,
    RpcExceptionFilter,
    ArgumentsHost,
    BadRequestException,
    ExceptionFilter,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        // throw new BadRequestException("hola");
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const rpcError = exception.getError();

        if (
            typeof rpcError === "object" &&
            "status" in rpcError &&
            "message" in rpcError
        ) {
            const status = Number.isNaN(rpcError.status)
                ? 400
                : Number(rpcError.status);
            return response.status(status).json(rpcError);
        }

        response.status(400).json({ status: 400, message: rpcError });
    }
}
