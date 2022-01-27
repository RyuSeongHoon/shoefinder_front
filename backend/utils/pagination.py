from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class InfiniteScrollPagination(PageNumberPagination):
    page_size_query_param = "size"
    page_query_param = "cursor"
    max_page_size = 100

    def get_paginated_response(self, data):
        next_cursor = self.page.next_page_number() if self.page.has_next() else None

        return Response(
            {
                "next_cursor": next_cursor,
                "total_count": self.page.paginator.count,
                "objects": data,
            }
        )


class DefaultPagination(PageNumberPagination):
    page_size_query_param = "size"
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response(
            {
                "total_pages": self.page.paginator.num_pages,
                "total_count": self.page.paginator.count,
                "objects": data,
            }
        )
