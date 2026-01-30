import { TabularData } from "../components/TabularData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export const ViewOnly = ({ snapshot } : { snapshot: { lastUpdated: Date; tables: { priority: number; code: string; tableName: string; data: { code: string; title: string; col1: string | number; col2: string | number; col3: string | number; }[]; }[]; } }) => {

    return (
        <Accordion type="single" collapsible>
            {snapshot.tables
            .sort((a, b) => a.priority - b.priority)
            .map((table, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                    {table.code} - {table.tableName}
                </AccordionTrigger>
                <AccordionContent>
                    <TabularData data={table.data} />
                </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}