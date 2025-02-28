
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@heroui/react";
import config from "@/config";
import blog from "@/config.blog"

export default function Blog() {
    return (
        <div className="flex flex-col gap-2">
            {blog.title && config.options.blog && <h2 className="text-2xl text-default-900 text-center">{blog.title}</h2>}
            {config.options.blog && <div className="flex flex-col items-center justify-center gap-4">
                {blog.posts != null && blog.posts.map((post, i) => (
                    <Card className="max-w-[300px]" key={i}>
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                                <Avatar
                                    isBordered
                                    radius="full"
                                    size="md"
                                    src={config.avatarImgSrc}
                                />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">{config.nickname}</h4>
                                    <h5 className="text-small tracking-tight text-default-400">@{config.nickname}</h5>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="px-3 py-0 text-small">
                            <p className="font-bold">{post.title}</p>
                            <span className="pt-2">
                                {post.description}
                            </span>
                        </CardBody>
                        <CardFooter className="gap-3 font-semibold text-default-400 text-small">
                            {post.footer}
                        </CardFooter>
                    </Card>)
                )}
            </div>}
        </div>
    )
}