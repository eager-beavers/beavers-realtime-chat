import {Controller, Get, Post} from "@nestjs/common";
import {AppService} from "../app.service";
import {ChattingService} from "../service/chatting.service";

@Controller()
export class ChattingController {
    constructor(private readonly service: ChattingService) {}

    @Post()
    publishChattingMessage(): void {
        this.service.publishMessage();
    }
}