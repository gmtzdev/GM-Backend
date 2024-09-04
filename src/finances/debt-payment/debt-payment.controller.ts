import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DebtPaymentService } from './debt-payment.service';
import { CreateDebtPaymentDto } from './dto/create-debt-payment.dto';
import { UpdateDebtPaymentDto } from './dto/update-debt-payment.dto';

@Controller('finances/debtPayment')
export class DebtPaymentController {
  constructor(private readonly debtPaymentService: DebtPaymentService) {}

  @Post()
  create(@Body() createDebtPaymentDto: CreateDebtPaymentDto) {
    return this.debtPaymentService.create(createDebtPaymentDto);
  }

  @Get()
  findAll() {
    return this.debtPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDebtPaymentDto: UpdateDebtPaymentDto,
  ) {
    return this.debtPaymentService.update(+id, updateDebtPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtPaymentService.remove(+id);
  }
}
