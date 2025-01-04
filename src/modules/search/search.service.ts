import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createIndexIfNotExists() {
    const indexExists = await this.elasticsearchService.indices.exists({
      index: 'users',
    });

    if (!indexExists) {
      await this.elasticsearchService.indices.create({
        index: 'users',
        body: {
          mappings: {
            properties: {
              name: { type: 'text' },
              email: { type: 'text' },
            },
          },
        },
      });
    }
  }

  async createUser(userData: any) {
    await this.createIndexIfNotExists();

    const response = await this.elasticsearchService.index({
      index: 'users',
      id: userData.id,
      body: userData,
    });

    return response;
  }

  async search(query: string) {
    try {
      const response = await this.elasticsearchService.search({
        index: 'users',
        body: {
          query: {
            query_string: {
              query: `*${query}*`,
              fields: ['name', 'email'],
              default_operator: 'AND',
            },
          },
        },
      });
      return response.hits.hits;
    } catch (error) {
      console.error('Elasticsearch search error:', error);
      throw error;
    }
  }

  async deleteUserFromES(userId: string) {
    try {
      const response = await this.elasticsearchService.delete({
        index: 'users',
        id: userId,
      });

      if (response.result === 'deleted') {
        return { message: 'User deleted successfully from Elasticsearch' };
      } else {
        return { message: 'User not found or could not be deleted' };
      }
    } catch (error) {
      console.error('Error deleting user from Elasticsearch:', error);
      return {
        message: 'An error occurred while deleting the user from Elasticsearch',
      };
    }
  }
}
