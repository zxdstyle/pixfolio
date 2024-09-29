FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /www
COPY . /www
RUN cd /www/resources/frontend && bun install --frozen-lockfile && bun run build
RUN ls /www


FROM golang:1.23-bookworm AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=1  \
#    GOARCH="amd64" \
    GOOS=linux

RUN apt-get update && apt-get install libvips-dev -y

WORKDIR /build
COPY --from=install /www .
CMD pwd
RUN go mod download
RUN go build --ldflags "-s -w" -o pixfolio .

FROM debian:bookworm-slim

RUN apt-get update && apt-get install --no-install-recommends libvips -y

WORKDIR /www

COPY --from=builder /build/pixfolio /www/
#COPY --from=builder /build/database/ /www/database/
#COPY --from=builder /build/public/ /www/public/
#COPY --from=builder /build/storage/ /www/storage/
COPY --from=builder /build/resources/views /www/resources/views
#COPY --from=builder /build/.env /www/.env
EXPOSE 3001

VOLUME ["/www/app"]

ENTRYPOINT ["sh", "-c"]

CMD ["/www/pixfolio artisan install && /www/pixfolio artisan serve"]
