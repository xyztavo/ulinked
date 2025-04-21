import config from "@/config";
import { LanyardResponse } from "./linktree";
import { Badge } from "@heroui/badge";
import { Tooltip } from "@heroui/tooltip";
import { Avatar } from "@heroui/avatar";

export function BadgeAvatar({ data }: { data?: LanyardResponse }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {data && config.lanyard.active ? (
        data.data.discord_status != "offline" ? (
          <Badge
            color={data.data.discord_status == "idle" ? "warning" : "success"}
            content={data.data.discord_status}
            placement="bottom-right"
            size="lg"
            variant="solid"
          >
            <Tooltip
              color="primary"
              content={
                data.data.activities.length > 0 && (
                  <div className="flex flex-col text-white items-center justify-center text-center p-2">
                    {data.data.activities
                      .filter(
                        (activity) =>
                          activity.name &&
                          !activity.name.includes("Spotify") &&
                          !activity.name.includes("Custom Status")
                      )
                      .map((activity, index) => (
                        <div key={index} className="mb-2">
                          <h1 className="text-center">
                            Currently on:{" "}
                            <span className="font-bold">{activity.name}</span>
                          </h1>
                          <div className="text-sm flex flex-col">
                            {activity.state && <h2>{activity.state}</h2>}
                            {activity.details && <h2>{activity.details}</h2>}
                          </div>
                        </div>
                      ))}
                  </div>
                )
              }
              placement="bottom"
              showArrow={false}
            >
              <Avatar
                isBordered
                className="w-24 h-24 bg-primary/25"
                color="primary"
                size="lg"
                src={config.avatarImgSrc}
              />
            </Tooltip>
          </Badge>
        ) : (
          <Avatar
            isBordered
            className="w-24 h-24 bg-transparen "
            size="lg"
            src={config.avatarImgSrc}
          />
        )
      ) : (
        <Avatar
          isBordered
          className="w-24 h-24 bg-transparent"
          size="lg"
          src={config.avatarImgSrc}
        />
      )}
      <h1 className="text-2xl">{config.nickname}</h1>
    </div>
  );
}
