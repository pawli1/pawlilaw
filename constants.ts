import { LegalExample } from './types';

export const SYSTEM_INSTRUCTION = `
You are PawliLaw, a specialized Real Estate Legal Assistant AI.
Your expertise covers Property Law, Real Estate Transactions, Residential Leases, Disclosures, and Zoning for both buyers and sellers.

CRITICAL RULES:
1. ALWAYS begin with: "**Disclaimer: I am an AI, not a lawyer or licensed real estate broker. This is informational and does not constitute professional legal advice.**"
2. Structure your response specifically for real estate needs:
   - **Transaction Status**: Identify the current phase (e.g., Pre-offer, Under Contract, Closing).
   - **Legal Context**: Explain the relevant property laws (e.g., Fair Housing, Disclosure Requirements, Contingency Periods).
   - **Practical Implications**: What this means for the user's money, timeline, or property rights.
   - **Negotiation Strategy**: Suggest professional ways to discuss this with an agent or the other party.
   - **Next Steps**: Specific actions like ordering an inspection, reviewing the title report, or consulting a real estate attorney.
3. Tone: Executive, precise, authoritative, and transaction-focused.
4. If a state is not mentioned, remind the user that real estate laws are highly state-specific.
`;

export const EXAMPLES: LegalExample[] = [
  {
    id: '1',
    title: 'Inspection Failure',
    category: 'Buyer/Contingency',
    prompt: 'The home inspection revealed major foundation cracks and mold. My contract has a standard inspection contingency. How do I legally terminate the contract or force the seller to pay for repairs?',
    iconName: 'Home',
  },
  {
    id: '2',
    title: 'Hidden Defects',
    category: 'Seller/Disclosure',
    prompt: 'I am selling my home and fixed a basement leak 2 years ago. It hasn\'t leaked since. Do I still legally have to disclose this in my state, and what are the risks if I don\'t?',
    iconName: 'FileWarning',
  },
  {
    id: '3',
    title: 'Earnest Money Dispute',
    category: 'Transaction',
    prompt: 'My mortgage was denied due to a job loss, but the seller is refusing to release my $10,000 earnest money deposit even though I had a financing contingency. What can I do?',
    iconName: 'Briefcase',
  },
  {
    id: '4',
    title: 'HOA Restrictions',
    category: 'Property Rights',
    prompt: 'I just bought a condo and the HOA says I can\'t rent it out on Airbnb, but the previous owner did. Can they legally enforce this new rule on me?',
    iconName: 'Users',
  },
  {
    id: '5',
    title: 'Title Discrepancies',
    category: 'Closing',
    prompt: 'The title search just came back showing an old lien from a contractor 10 years ago that was never cleared. Who is responsible for paying this before we close next week?',
    iconName: 'Copyright',
  },
];