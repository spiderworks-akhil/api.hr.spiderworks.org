import { Module } from '@nestjs/common';
import { StarRatingService } from './star-rating.service';
import { StarRatingController } from './star-rating.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StarRatingController],
  providers: [StarRatingService],
})
export class StarRatingModule {}
