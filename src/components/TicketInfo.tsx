
type Agent = {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
};

type TicketInfoProps = {
  ticketNumber: string | null;
  agent: Agent | null;
};

export function TicketInfo({ ticketNumber, agent }: TicketInfoProps) {
  if (!ticketNumber && !agent) return null;

  return (
    <div className="mt-2 text-xs text-blue-600">
      {ticketNumber && (
        <div>
          <span>Ticket Number: </span>
          <span className="font-semibold">{ticketNumber}</span>
        </div>
      )}
      {agent && (
        <div>
          <span>Assigned Agent: </span>
          <span className="font-semibold">{agent.name}</span>
          <span> ({agent.specialty})</span>
        </div>
      )}
    </div>
  );
}