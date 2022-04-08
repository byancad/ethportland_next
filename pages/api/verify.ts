import { ironOptions } from "configs/iron";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { message, signature } = req.body;
        const siweMessage = new SiweMessage(message);
        const fields = await siweMessage.validate(signature);
        req.session.siwe = fields;
        req.session.siwe.session = true;
        await req.session.save();
        res.send({
          address: req.session.siwe?.address,
          session: req.session.siwe?.session,
        });
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
