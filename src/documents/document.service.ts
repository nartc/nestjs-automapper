import { ContentQueryResult, Search } from './models';

import { API_DOCUMENTS } from '@constants/api.constants';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PATH_SEARCH_CONTENT } from './../shared/constants/api.constants';
import axios from 'axios';

@Injectable()
export class DocumentService {
  constructor(private readonly configService: ConfigService) {}

  async searchContentByCondition(
    search: Search
  ): Promise<ContentQueryResult[]> {
    const databaseURL = this.configService.get<string>(
      'integrations.database_gateway_api'
    );

    const documentURL = `${databaseURL}${API_DOCUMENTS}/${PATH_SEARCH_CONTENT}`;
    const { data } = await axios.post(documentURL, search);
    return data;
  }
}
