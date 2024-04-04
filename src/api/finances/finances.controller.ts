import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FinancesService } from './finances.service';

@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Get('getIncomesPer/:date')
  getIncomesPer(@Param('date') date: string){
    return this.financesService.getIncomesPer(date);
  }

  @Get('getIncomesVsBills/:year')
  async getIncomesVsBills(@Param('year', ParseIntPipe) year: number){
    return this.financesService.getIncomesVsBills(year);
  }













  
  // @Post()
  // create(@Body() createFinanceDto: CreateFinanceDto) {
  //   return this.financesService.create(createFinanceDto);
  // }

  // @Get()
  // findAll() {
  //   return this.financesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.financesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
  //   return this.financesService.update(+id, updateFinanceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.financesService.remove(+id);
  // }
}
