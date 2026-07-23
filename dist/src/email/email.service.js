"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nodemailer = __importStar(require("nodemailer"));
const paginate_1 = require("../common/utils/paginate");
const email_message_schema_1 = require("./schemas/email-message.schema");
let EmailService = class EmailService {
    emailMessageModel;
    configService;
    transporter = null;
    constructor(emailMessageModel, configService) {
        this.emailMessageModel = emailMessageModel;
        this.configService = configService;
    }
    create(createEmailMessageDto) {
        const created = new this.emailMessageModel(createEmailMessageDto);
        return created.save();
    }
    findAll(query) {
        const filter = {};
        if (query.mailbox !== undefined) {
            filter.mailbox = query.mailbox;
        }
        return (0, paginate_1.paginate)(this.emailMessageModel, filter, query);
    }
    async findOne(id) {
        const message = await this.emailMessageModel.findById(id).exec();
        if (!message) {
            throw new common_1.NotFoundException(`Email message ${id} not found`);
        }
        return message;
    }
    async update(id, updateEmailMessageDto) {
        const updated = await this.emailMessageModel
            .findByIdAndUpdate(id, updateEmailMessageDto, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Email message ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.emailMessageModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new common_1.NotFoundException(`Email message ${id} not found`);
        }
        return deleted;
    }
    async setRead(id, read = true) {
        const updated = await this.emailMessageModel
            .findByIdAndUpdate(id, { read }, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Email message ${id} not found`);
        }
        return updated;
    }
    async toggleStar(id) {
        const message = await this.emailMessageModel.findById(id).exec();
        if (!message) {
            throw new common_1.NotFoundException(`Email message ${id} not found`);
        }
        message.starred = !message.starred;
        return message.save();
    }
    getTransporter() {
        if (this.transporter) {
            return this.transporter;
        }
        const user = this.configService.get('GMAIL_USER');
        const pass = this.configService.get('GMAIL_APP_PASSWORD');
        if (!user || !pass) {
            return null;
        }
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass },
        });
        return this.transporter;
    }
    async send(sendEmailDto) {
        const transporter = this.getTransporter();
        if (!transporter) {
            throw new common_1.ServiceUnavailableException('Email sending is not configured — set GMAIL_USER and GMAIL_APP_PASSWORD');
        }
        const from = this.configService.get('GMAIL_USER');
        const { to, cc, bcc, subject, body } = sendEmailDto;
        await transporter.sendMail({
            from,
            to,
            cc,
            bcc,
            subject,
            html: body,
        });
        const sentAt = new Date();
        const created = new this.emailMessageModel({
            mailbox: email_message_schema_1.EmailMailbox.SENT,
            from,
            to,
            cc,
            bcc,
            subject,
            body,
            read: true,
            starred: false,
            sentAt,
        });
        return created.save();
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(email_message_schema_1.EmailMessage.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map