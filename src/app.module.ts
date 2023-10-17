import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskHistoriesModule } from './tasks.histories/tasks.histories.module';
import { TaskHistoryCommentsModule } from './tasks.histories.comments/tasks.histories.comments.module';
import { TasksTransitionsModule } from './tasks.transitions/tasks.transitions.module';

@Module({
  imports: [
    UsersModule,
    TokensModule,
    TasksModule,
    TaskHistoriesModule,
    TaskHistoryCommentsModule,
    TasksTransitionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
